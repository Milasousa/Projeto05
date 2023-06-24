insert into alunos(name,email,funcao) values ('Amilda Juca','amilda.juca@gmail.com','ESTAGIO');
insert into projetos(id, descricaoprojeto, nameprojeto) values (1,'Estudo de Banco Relacionais', 'Banco de dados projeto');
insert into professores (email, formacao, funcao, name, id) values ('caio@gmail.com','Banco de Dados','COORDINATOR','Caio Jose da Silva Pereira',1);
update alunos set projeto_id=1 where id=1 ;
insert into alunos(name,email,funcao,projeto_id) values ('Alan Turing','alan.turing@gmail.com','MASTER',1);

