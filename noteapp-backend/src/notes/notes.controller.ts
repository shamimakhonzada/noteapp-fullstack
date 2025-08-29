import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('api/note')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    try {
      const note = await this.notesService.create(createNoteDto);
      return { success: true, data: note };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create note',
        error: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const notes = await this.notesService.findAll();
      return { success: true, data: notes };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch notes',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const note = await this.notesService.findOne(+id);
      if (!note) {
        return { success: false, message: 'Note not found' };
      }
      return { success: true, data: note };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch note',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      const updatedNote = await this.notesService.update(+id, updateNoteDto);
      return { success: true, data: updatedNote };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update note',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.notesService.remove(+id);
      return { success: true, message: 'Note deleted successfully' };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete note',
        error: error.message,
      };
    }
  }
}
