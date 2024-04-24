import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  private readonly fileName = 'messages.json';

  async findOne(id: string) {
    const contents = await readFile(this.fileName, 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll() {
    const contents = await readFile(this.fileName, 'utf8');
    return JSON.parse(contents);
  }

  async create(content: string) {
    const contents = await readFile(this.fileName, 'utf-8');
    const messages = JSON.parse(contents);

    const id = this.generateId();

    messages[id] = { id, content };

    await writeFile(this.fileName, JSON.stringify(messages));
  }

  private generateId() {
    const random = Math.random();
    const date = Date.now();
    const rawId = random * date;
    const rawIdToHex = rawId.toString(16);
    return rawIdToHex.replace('.', '').toUpperCase();
  }
}
