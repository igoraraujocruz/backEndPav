import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

   @Column()
    password: string;
    
    @Column() 
    create_at: Date;

    @Column() 
    updated_at: Date;

    @Column() 
    avatar: string;
}

export default Usuario;