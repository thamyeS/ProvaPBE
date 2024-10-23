const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'hoteis'
});

con.connect((err) =>{
    if(err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('conectado ao banco de dados.');
});

const teste = (req, res) => {
    res.send("Back-end respondendo");
}

     // CRUD - Create Clientes
const createClientes = (req, res) =>{
    const {nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;

    const query = 'INSERT INTO Clientes(nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'Cliente Criado com sucesso', result});
        }
    });
};

     // CRUD - Read Clientes
     const readClientes = (req, res) => {
        con.query("SELECT * FROM Clientes", (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json(result);
            }
     });
}

     // CRUD - Update Clientes
     const updateClientes = (req, res) => {
        const {cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;
    
        const query = 'UPDATE Clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';
        con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result) =>{
            if(err) {
                res.status(500).json({error: err,message});
            } else {
                res.json({message:'Cliente atualizado com sucesso', result});
            }
        });
    }

     // CRUD - Delete Clientes
     const deleteClientes = (req, res) => {
        const {cliente_id} = req.params;

        const query = 'DELETE FROM Clientes WHERE cliente_id = ?';
        con.query(query, [cliente_id], (err, result) =>{
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message: 'Cliente removido com sucesso', result});
            }
        });
    }

    //Saida Front
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

//Rota para Clientes
app.post("/Clientes", createClientes);
app.get("/Clientes", readClientes);
app.put("/Clientes", updateClientes);
app.delete("/Clientes/:cliente_id", deleteClientes);


     // CRUD - Create Telefone
const createTelefone = (req, res) =>{
        const {numero, tipo} = req.body;
    
        const query = 'INSERT INTO Telefone (numero, tipo) VALUES(?, ?)';
        con.query(query, [numero, tipo], (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.status(201).json({message: 'Telefone Criado com sucesso', result});
            }
        });
    }
    
    //CRUD - Read Telefone
    const readTelefone = (req, res) => {
        con.query("SELECT * FROM telefone", (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json(result);
            }
        });
    }
    
        //CRUD - Update Telefone
    const updateTelefone = (req, res) => {
        const {cliente_id, numero, tipo} = req.body;
    
        const query = 'UPDATE Telefone SET numero = ?, tipo= ? WHERE cliente_id = ?';
        con.query(query, [numero, tipo, cliente_id], (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message:'Telefone atualizado com sucesso', result});
            }
        });
    }
    
        //CRUD - Delete Telefone
        const deleteTelefone = (req, res) => {
            const {cliente_id} = req.params;
    
            const query = 'DELETE FROM Telefone WHERE cliente_id = ?';
            con.query(query, [cliente_id], (err, result) =>{
                if(err) {
                    res.status(500).json({error: err.message});
                } else {
                    res.json({message: 'Telefone removido com sucesso', result});
                }
            });
        }
    
    
 //Rota para Telefone
    app.post("/Telefones", createTelefone);
    app.get("/Telefones", readTelefone);
    app.put("/Telefones", updateTelefone);
    app.delete("/Telefones/:cliente_id", deleteTelefone);
    

// CRUD - Create Quartos
const createQuartos = (req, res) =>{
    const {numero, andar, tipo, valor_diaria, statusQuarto } = req.body;

    const query = 'INSERT INTO Quartos (numero, andar, tipo, valor_diaria, statusQuarto) VALUES(?, ?, ?, ?, ?)';
    con.query(query, [numero, andar, tipo, valor_diaria, statusQuarto], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'Quarto Criado com sucesso', result});
        }
    });
}

//CRUD - Read Quartos
const readQuartos = (req, res) => {
    con.query("SELECT * FROM Quartos", (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

    //CRUD - Update Quartos
const updateQuartos = (req, res) => {
    const {quarto_id, numero, andar, tipo, valor_diaria, statusQuarto} = req.body;

    const query = 'UPDATE Quartos SET numero = ?, andar = ?, tipo = ?, valor_diaria = ?, statusQuarto = ? WHERE quarto_id = ?';
    con.query(query, [numero, andar, tipo, valor_diaria, statusQuarto, quarto_id], (err, result) => {
        if(err) {
            res.status(500).json({error: err,message});
        } else {
            res.json({message:'Quarto atualizado com sucesso', result});
        }
    });
}

    //CRUD - DELETE Quartos
    const deleteQuartos = (req, res) => {
        const {cliente_id} = req.params;

        const query = 'DELETE FROM Quartos WHERE cliente_id = ?';
        con.query(query, [cliente_id], (err, result) =>{
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message: 'Quarto removido com sucesso', result});
            }
        });
    }


//Rota para Quartos
app.post("/Quartos", createQuartos);
app.get("/Quartos", readQuartos);
app.put("/Quartos", updateQuartos);
app.delete("/Quartos/:cliente_id", deleteQuartos);


// CRUD - Create Reservas
const createReservas = (req, res) =>{
    const {data_reserva, data_entrada, data_saida, valor_total, statusReserva} = req.body;

    const query = 'INSERT INTO Reservas (data_reserva, data_entrada, data_saida, valor_total, statusReserva) VALUES (?, ?, ?, ?, ?)';
    con.query(query, [data_reserva, data_entrada, data_saida, valor_total, statusReserva], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'Reservas Criado com sucesso', result});
        }
    });
}

//CRUD - Read Reservas
const readReservas = (req, res) => {
    con.query("SELECT * FROM Reservas", (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

    //CRUD - Update Reservas
const updateReservas = (req, res) => {
    const {cliente_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva} = req.body;

    const query = 'UPDATE Reservas SET data_reserva = ?, data_entrada = ?, data_saida = ?, valor_total = ?, statusReserva = ? WHERE cliente_id = ?';
    con.query(query, [data_reserva, data_entrada, data_saida, valor_total, statusReserva, cliente_id], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message:'Reservas atualizado com sucesso', result});
        }
    });
}

    //CRUD - DELETE Reservas
    const deleteReservas = (req, res) => {
        const {cliente_id} = req.params;

        const query = 'DELETE FROM Reservas WHERE cliente_id = ?';
        con.query(query, [cliente_id], (err, result) =>{
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message: 'Reservas removido com sucesso', result});
            }
        });
    }
    //Rota para Reservas
app.post("/Reservas", createReservas);
app.get("/Reservas", readReservas);
app.put("/Reservas", updateReservas);
app.delete("/Reservas/:cliente_id", deleteReservas);


    
// CRUD - Create Estacionamento
const createEstacionamento = (req, res) =>{
    const {veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida} = req.body;

    const query = 'INSERT INTO Estacionamento (veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida) VALUES (?, ?, ?, ?, ?)';
    con.query(query, [veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'Estacionamento Criado com sucesso', result});
        }
    });
}

//CRUD - Read Estacionamento
const readEstacionamento = (req, res) => {
    con.query("SELECT * FROM Estacionamento", (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

    //CRUD - Update Estacionamento
const updateEstacionamento = (req, res) => {
    const {cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida} = req.body;

    const query = 'UPDATE Estacionamento SET veiculo_placa = ?, veiculo_marca = ?, veiculo_modelo = ?, data_entrada = ?, data_saida = ? WHERE cliente_id = ?';
    con.query(query, [veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida, cliente_id], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message:'Estacionamento atualizado com sucesso', result});
        }
    });
}

    //CRUD - DELETE Estacionamento
    const deleteEstacionamento = (req, res) => {
        const {veiculo_placa} = req.params;

        const query = 'DELETE FROM Estacionamento WHERE veiculo_placa = ?';
        con.query(query, [veiculo_placa], (err, result) =>{
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message: 'Estacionamento removido com sucesso', result});
            }
        });
    }


//Rota para Estacionamento
app.post("/Estacionamento", createEstacionamento);
app.get("/Estacionamento", readEstacionamento);
app.put("/Estacionamento", updateEstacionamento);
app.delete("/Estacionamento/:veiculo_placa", deleteEstacionamento);

   //Teste de porta
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});