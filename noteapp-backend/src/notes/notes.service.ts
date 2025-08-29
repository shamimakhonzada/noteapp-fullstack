import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}
  async create(createNoteDto: CreateNoteDto) {
    const note = await this.prisma.note.create({
      data: createNoteDto,
    });
    return note;
  }

  async findAll() {
    return await this.prisma.note.findMany({});
  }

  async findOne(id: number) {
    const findUser = await this.prisma.note.findFirst({
      where: { id: id },
    });
    return findUser;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.prisma.note.update({
      where: { id: id },
      data: updateNoteDto,
    });
    return updatedNote;
  }

  async remove(id: number) {
    await this.prisma.note.delete({ where: { id: id } });
    return 'Note deleted successfully';
  }
}
