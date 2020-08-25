const express = require("express")
const server = express()

// pegar banco de dados
const db = require("./database/db.js")


//configurar pasta publica
server.use(express.static("public"))

//habilitar o req.body
server.use(express.urlencoded({ extended: true }))


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html")
})

//cadastro de locais
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

//add itens cadastrados no banco de dados
server.post("/savepoint", (req, res) => {
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?)
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastro com sucesso")
        console.log(this)

        return res.render("/create-point.html", { saved: true })

    }

    db.run(query, values, afterInsertData)


})

//mostrar locais cadastrados
server.get("/search-result", (req, res) => {


    const search = req.query.search

    if (search == "") {
        return res.render("search-result.html", { total: 0 })
    }

    db.all(`SELECT * FROM plcaes WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            console.log(err)
        }
        const total = rows.length
    })


    //pegar os dados do banco
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
            //mostrar a pagina html com os bancos de dados
        return res.render("search-result.html", { places: rows, total: total })
    })


})

// ligar o servidor
server.listen(3000)