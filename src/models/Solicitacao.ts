import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('solicitacoes')
class Solicitacao {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

   @Column() 
    atendimento: string;

    @Column() 
    carteira: string;

    @Column() 
    idade: number;

    @Column() 
    sexo: string;

    @Column() 
    regulamentado: string;

    @Column() 
    tipo: string;

    @Column() 
    solicitante: string;

    @Column() 
    quarto: string;

    @Column() 
    data_da_internacao: Date;

    @Column() 
    data_da_cirurgia: Date;

    @Column() 
    created_at: Date;

    @Column() 
    updated_at: Date;

}

export default Solicitacao;