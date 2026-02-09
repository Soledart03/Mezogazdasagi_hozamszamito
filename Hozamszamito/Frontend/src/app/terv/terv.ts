import { Component,OnInit } from '@angular/core';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
import { Tervservice } from '../tervservice';
import { Observable } from 'rxjs';
import { Foldservice } from '../foldservice';
import { DEJAVU_BASE64 } from '../../assets/fonts/dejavu';
import { filter, switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
@Component({
  selector: 'app-terv',
  standalone: false,
  templateUrl: './terv.html',
  styleUrl: './terv.css',
})

export class Terv implements OnInit {
constructor(private app:App,private gazdaser:Gazdaservice,private tervser:Tervservice,private foldser:Foldservice){}
terv$!: Observable<any[]>;
folds$!: Observable<any[]>;
foldId: number = 0;
gazdaId: number = 0;
terv:any = {id:0,fold_id:0,noveny_id:0,kiv_vetoid:0,kiv_mutrid:0,vetes_idopont:'',tomeg:0,osszeg:0}
fold:any = {id:0,terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',g_id:0};
foldek:any = [];
novenyek:any = [];
vetomagok:any = [];
mutragyak:any = [];
osszegMap: { [tervId: number]: number } = {};
mutrMap: { [tervId: number]: boolean } = {};
mutrvane = false;
flood:any = [];
tpk:any[] = [];
tervek: any[] = [];
editing:boolean=false;
ngOnInit() {
  this.folds$ = this.foldser.fold$;

  this.gazdaser.gazda$.subscribe(gazda => {
    this.gazdaId = gazda?.id ?? 0;

    if (this.gazdaId !== 0) {
      this.foldser.loadFoldsByGazdaId(this.gazdaId);
    }

    console.log('gazdaId:', this.gazdaId);
  });

  this.foldser.fold$.subscribe(folds => {
    this.foldId = folds?.[0]?.id ?? 0;
    
    
  });
  this.foldser.getFoldida(this.gazdaId).subscribe(folds => {
    this.foldek = folds;
    console.log('folds:', this.foldek);
    if (this.foldek.length > 0) {
      const foldId = this.foldek[0].id;
      this.tervser.loadTervByFold(foldId);
      
      this.tervek.push(this.tervser.tervek);
      this.tervmasol = this.tervek.map(x => ({
        ...x,
        aktiv:false
      }));
      console.log('tervek:',this.tervek);
    }
  });
 
  this.tervser.loadNoveny().subscribe(noveny => {
    this.novenyek = noveny;
  });
  this.tervser.loadnovinp().subscribe(tpk => {
    this.tpk = tpk;
  });
  this.tervser.loadConnNovinp().subscribe(vetomag => {
    this.vetomagok = vetomag;
    console.log('vetomag:',this.vetomagok);
  });
  this.tervser.loadMutragya().subscribe(mutragya => {
    this.mutragyak = mutragya;
    console.log('mutragya:',this.mutragyak);
  });
  this.tervser.loadVetomag().subscribe(vetomag => {
    this.vetomagok = vetomag;
    console.log('vetomag:',this.vetomagok);
  });
  this.terv$ = this.gazdaser.gazda$.pipe(
    filter(g => !!g),
    switchMap(g =>
      this.foldser.getFoldida(g.id).pipe(
        switchMap(folds => {
          const calls = folds.map(f =>
            this.tervser.loadterv(f.id)
          );
          return forkJoin(calls);
        }),
        map((tervekTombje: any[][]) => tervekTombje.flat())
      )
    )
  );
  
  /*
  this.terv$.subscribe(tervek => {
  tervek.forEach(terv => {
    if (this.mutrMap[terv.id] === undefined) {
      this.mutrMap[terv.id] = terv.kiv_mutrid != null && terv.kiv_mutrid !== 0;
    } 
  });
  
  
});
*/
  
}
selectedTerv: any = null;
kiadottcount: number = 0;
kiadottosszeg: number = 0;
szurtfoldek:any = [];
tpksel:number = 0;
getFold(terv: any) {
  return this.foldek.find(
    (f: any) => f.id === terv.fold_id
  );
}
tervmasol: any[] = [];
szurtterv:any[] = [];

getossz(terv: any) {
  if (this.osszegMap[terv.id] !== undefined) {
    return this.osszegMap[terv.id];
  }

  if (terv.osszeg && terv.osszeg !== 0) {
    this.osszegMap[terv.id] = terv.osszeg;
    return terv.osszeg;
  }
  for(let i = 0; i < this.tervek.length; i++){
    console.log(this.tervek[i]);
    for(let j = 0; j < this.tervek[i].length; j++){
      for (let k = 0; k < this.tervek[i][j].length; k++) {
      console.log(this.tervek[i][j][k]);
      if(this.tervek[i][j][k].id === terv.id){
        console.log("haaaaaaaaa" + this.tervek[i][j][k].osszeg);
        
            this.osszeg = this.tervek[i][j][k].osszeg;
            this.beavszuk = true;
            return this.osszeg;
          }
          
    }
    
  }
}
this.osszegMap[terv.id] = 0;
  return 0;
}
getkiadottcount: any[] =  [];
getkiadottsum: any[] =  [];
getkiacount(terv: any) {
  this.tervser.loadKiadCount(terv.fold_id).subscribe(s => {
    this.getkiadottcount = s;
    console.log(this.getkiadottcount);
  });
  
}
getkiadossz(terv: any) {
   this.tervser.loadKiadSum(terv.fold_id).subscribe(s => {
    this.getkiadottsum = s;
    console.log(this.getkiadottsum);
  });
}
osszevon(terv:any){
  this.getkiacount(terv);
  this.getkiadossz(terv);
}
getKivVetomag(terv: any) {
  return this.vetomagok.find(
    (f: any) => f.iad === terv.kiv_vetoid
  );
}
beavszuk:boolean = false;
getnovinp(terv: any) {
  const result = this.tpk.find(f => f.iad === terv.kiv_vetoid);
  
  console.log('találat:', result.tpk);
  return result.tpk;
}
getVetomag(terv: any) {
  return this.vetomagok.find(
    (f: any) => f.id === terv.fold_id
  );
}
vanegMutragya(terv: any) {
  let kivmutr = this.mutragyak.find(
    (f: any) => f.id === terv.kiv_mutrid
  );
  if(kivmutr != null){
    this.mutrvane = true;
  }
} 
getKivMutragya(terv: any) {
  return this.mutragyak.find(
    (f: any) => f.id === terv.kiv_mutrid
  );
}

getNoveny(terv: any) {
  return this.novenyek.find(
    (n: any) => n.id === terv.noveny_id
  );
}
osszeg:number = 0;
Vegosszeg(terv:any){
  /*
  if (this.osszegMap[terv.id] && this.osszegMap[terv.id] !== 0) {
    return;
  }
  */
  const tpk = parseInt(this.getnovinp(terv));
  const vetomagar =
    parseInt(terv.tomeg) *
    tpk * 
    this.getNoveny(terv).termar;

  //this.osszegMap[terv.id] = vetomagar;
    this.tervser.updateOsszeg(terv.id,vetomagar).subscribe(s=>{
    console.log(s);
    
  console.log(terv)
  console.log(vetomagar);
  });
  

  
 
}

addLabelValue(doc: jsPDF, label: string, value: string, x: number, y: number) {
  doc.setFont('DejaVu');
  doc.text(label, x, y);
  doc.setFont('DejaVu', 'normal');
  doc.text(value ?? '-', x + 55, y);
}
PDFgen(terv: any) {
   
  //'p', 'mm', 'a4'
  const doc = new jsPDF();
(doc as any).addFileToVFS(
  'DejaVuSans.ttf',
  DEJAVU_BASE64
);
(doc as any).addFont(
  'DejaVuSans.ttf',
  'DejaVu',
  'normal'
);
doc.setFont('DejaVu');
  const kepUrl = this.getNoveny(terv)?.kep;
  const fold = this.getFold(terv);
  const noveny = this.getNoveny(terv);
  const vetomag = this.getKivVetomag(terv);
  const mutragya = this.getKivMutragya(terv);

  
  doc.setFontSize(20);
  doc.text('Terv adatok', 105, 15, { align: 'center' });

  doc.setDrawColor(0);
  doc.line(10, 20, 200, 20);

  doc.setFontSize(11);

  let y = 30;

  this.addLabelValue(doc, 'Helyrajzi szám:', fold?.helyrajzi_szam, 10, y); y += 8;
  this.addLabelValue(doc, 'Vetés időpont:', terv.vetes_idopont.split('T')[0], 10, y); y += 8;
  this.addLabelValue(doc, 'Növény:', noveny?.nnev, 10, y); y += 8;
  this.addLabelValue(doc, 'Terület (ha):', fold?.terulet?.toString(), 10, y); y += 8;
  this.addLabelValue(doc, 'Művelési ág:', fold?.muvelesi_ag, 10, y); y += 8;
  this.addLabelValue(doc, 'Vetőmag:', vetomag?.fajta, 10, y); y += 8;
  this.addLabelValue(doc, 'Vetőmag tömeg:', terv.tomeg + ' kg', 10, y); y += 8;

  if (this.mutrvane) {
    this.addLabelValue(doc, 'Műtrágya:', mutragya?.fajta.split(" ").slice(0,2).join(" "), 10, y); y += 8;
  }

  
  var mutrtomeg = mutragya?.fajta.split(" ").slice(-1)[0].slice(0,2);
  
  console.log(mutrtomeg);
  autoTable(doc, {
    startY: y + 5,
    head: [['Tétel', 'Mennyiség', 'Egységár (Ft)', 'Összeg (Ft)']],
    body: [
      [
        'Vetőmag',
        `${terv.tomeg} kg`,
        vetomag?.ar ?? '-',
        vetomag ? (terv.tomeg * vetomag.ar).toLocaleString() : '-'
      ],
      mutragya ? [
        'Műtrágya',
        //mutragya?.fajta.split(" ").slice(-1),
        mutrtomeg + 'kg',
        mutragya.ar,
        (mutrtomeg * mutragya.ar).toLocaleString()
      ] : []
    ].filter(r => r.length),
    styles: {
       font: 'DejaVu',
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      font: 'DejaVu',
      fillColor: [22, 160, 133]
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(
    `Összes költség: ${terv.osszeg.toLocaleString()} Ft`,
    10,
    finalY
  );

 const fileName = this.getFold(terv)?.helyrajzi_szam;
  

fetch(kepUrl)
    .then(res => res.blob())
    .then(blob => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }))
    .then(base64 => {
      doc.addImage(base64, 'PNG', 125, 15, 75, 75);
      doc.save(fileName); 
    })
}

openEdit(terv: any) {
  
  this.selectedTerv = { ...terv };
  this.editing = true;
}
/*
delTerv(terv: any) {
  this.tervser.deleteTerv(terv.id);
  this.tervser.loadTervByFold(this.gazdaId);
  window.alert("Tervezet törölve!")
}

  save() {
  this.tervser.updateTerv(this.selectedTerv);
  this.editing = false;
}
cancel() {
  this.editing = false;
  this.tervser.loadTervByFold(this.gazdaId);
}
  */
openMenu(type: any){
    this.app.openMenu(type);
  }

}
