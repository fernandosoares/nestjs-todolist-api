import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todos.create({ data: createTodoDto });
  }

  async findAll(): Promise<Todo[]> {
    return this.prisma.todos.findMany({ orderBy: { createdAt: 'asc' } });
  }

  async findOne(id: string): Promise<Todo> {
    return this.prisma.todos.findFirstOrThrow({ where: { id: id } });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todos.update({ data: updateTodoDto, where: { id: id } });
  }

  async remove(id: string): Promise<Todo> {
    return this.prisma.todos.delete({ where: { id: id } });
  }
}
