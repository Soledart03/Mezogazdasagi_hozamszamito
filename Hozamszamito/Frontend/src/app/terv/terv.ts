import { Component,OnInit } from '@angular/core';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
import { Tervservice } from '../tervservice';
import { Observable } from 'rxjs';
import { Foldservice } from '../foldservice';
import { DEJAVU_BASE64 } from '../../assets/fonts/dejavu';
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
mutrvane = false;
flood:any = [];
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
    }
  });
  this.tervser.loadNoveny().subscribe(noveny => {
    this.novenyek = noveny;
  });
  this.tervser.loadConnNovinp().subscribe(vetomag => {
    this.vetomagok = vetomag;
    console.log('vetomag:',this.vetomagok);
  });
  this.tervser.loadMutragya().subscribe(mutragya => {
    this.mutragyak = mutragya;
    console.log('mutragya:',this.mutragyak);
  });
  
  this.terv$ = this.tervser.terv$;
  
}
selectedTerv: any = null;
kiadottcount: number = 0;
kiadottosszeg: number = 0;
szurtfoldek:any = [];
getFold(terv: any) {
  return this.foldek.find(
    (f: any) => f.id === terv.fold_id
  );
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
Vegosszeg(terv:any){
  
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
        mutragya?.fajta.split(" ").slice(-1),
        mutragya.ar,
        (mutragya.tomeg * mutragya.ar).toLocaleString()
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
    `Összes költség: ${terv.osszeg?.toLocaleString() ?? '---'} Ft`,
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
      doc.addImage(base64, 'PNG', 110, 7, 100, 100);
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
