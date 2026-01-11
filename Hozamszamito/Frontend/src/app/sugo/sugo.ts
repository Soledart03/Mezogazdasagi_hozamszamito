import { Component } from '@angular/core';
import { PolliService } from '../poliaiservice';
interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './sugo.html',
  styleUrls: ['./sugo.css']
})
export class Sugo {
  userInput = '';
  messages: ChatMessage[] = [];
  loading = false;

  constructor(private pollinations: PolliService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ role: 'user', text: userMessage });
    this.userInput = '';
    this.loading = true;

    // OPTIONAL: include chat history for memory
    const prompt = this.buildPrompt(userMessage);

    this.pollinations.generateText(prompt).subscribe({
      next: (res) => {
        this.messages.push({ role: 'bot', text: res.reply });
        this.loading = false;
      },
      error: () => {
        this.messages.push({
          role: 'bot',
          text: 'Error contacting AI service.'
        });
        this.loading = false;
      }
    });
  }

  private buildPrompt(latestUserMessage: string): string {
    let history = 'You are a helpful assistant.\n';

    for (const msg of this.messages) {
      history += msg.role === 'user'
        ? `User: ${msg.text}\n`
        : `Assistant: ${msg.text}\n`;
    }

    history += `User: ${latestUserMessage}\nAssistant:`;
    return history;
  }
}
