describe('Testing requests', () => {
    it('Should create a new employee in the DB', async () => {
        cy.request({
            method: 'POST',
            url: 'employees',
            body: {
                id: '5',
                first_name: 'Davesito',
                last_name: 'Lolsito',
                email: "trololol@platzi.com"
            }
        }).then(res => {
            expect(res.status).to.be.equal(201) // 201 succesful creation
            expect(res.body).to.have.property('id')

            //Saves the id of the employee created in the DB
            const id = res.body.id
            cy.wrap(id).as('id')
            cy.log(id)
        })
    });


    it('Should validate the employee created in the DB', function () {
        cy.request("GET","employees").then(res => {
            //Id's start on 0 that's why we use the length - 1
           
            expect(res.body[res.body.length - 1].first_name).to.eq("Davesito")
        })
    });

    it('Should update the employee created in the DB', function () {
        cy.request({
            method: 'PUT',
            url: `employees/${this.id}`,
            body: {
                first_name: 'Tatisita',
                last_name: 'lalsita',
                email: "lalsita@platzi.com"                
            }
        }).then(res => {
            expect(res.status).to.be.equal(200) // 200 succesful update
            expect(res.body).to.have.property('id')
            cy.log(res)
        })
    })

     it('Should delete the employee created in the DB', function () {
         cy.request({
             method: 'DELETE',
             url: `employees/${this.id}`
         }).then(res => {
             expect(res.status).to.equal(200)
         })
     })


 });     