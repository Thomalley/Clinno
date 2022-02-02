const { Router } = require("express");
router = Router()
 var passport = require('passport');
const { Cliente } = require('../db')
 // ruta que devuelva clientes//
 //Get/cliente//
 router.get('/', (req, res,next) => {
     Cliente.findAll().then(users => { res.json(users); }).catch(error => { res.status(400).json({ error }) })
   });

   //ruta para crear cliente//
 //Post/cliente//

//  router.post('/socialAuth', async (req, res, next) => {
//      const { email, familyName, givenName, googleId, imageUrl, nombre } = req.body
  
//      const user = await User.findOne({ where: { email } }).catch(error => { res.status(400).json({ error }) })
  
//      if(user){
//        return res.json(user)
//      }else{
//        const newUser = await User.create({
//          email,
//          nombre,
//          lastName: familyName,
//          password: googleId,
//          direccion: 'Otamendi 95',
//          image: imageUrl
//        })
  
//        return res.json(newUser)
//      }
//    });

router.post("/", async (req,res) => {  
     try{
      const {email, password, nombre, apellido, direccion, dni, admin} = req.body;

      console.log(email, password, nombre, apellido, direccion, dni, admin)

       const user = await Cliente.create({
         nombre,
         apellido,
         email,
         direccion,
         dni,
         admin,
         password,
       }) 
       res.json(user)
 }
 catch(error){
   console.log(error)
 }
 });


   //modifica usuario//
   router.put('/:id', (req, res) => {
     Cliente.findOne({
       where: {id: req.params.id}
     }).then(user=>{
       user.update({
                 email: req.body.email,
                 password: req.body.password,
                 name: req.body.name,
                 lastName: req.body.lastName,
                 address: req.body.address,
                 image: req.body.image,
                 admin: req.body.admin,
             }).then(user => { res.status(200).json({ user }); }).catch(error => { res.status(400).json({ error }) });
         }).catch(error => { res.status(400).json({ error }) })
     });


     //Crea ruta para eliminar Usuario//
 //DELETE/users/:id//
 router.delete('/:id', (req, res) => {
     Cliente.destroy({
       where: {id: req.params.id}
     }).then(deletedRecord => {
       if (deletedRecord === 1) { res.status(200).json({ message: "User deleted successfully" }); }
           else { res.status(404).json({ message: "User not found" }) }
       }).catch(error => { res.status(500).json(error); });
   });

   //ruta login google?//
   router.post('/google', 
   passport.authenticate('local',{failureMessage:"An error appeared"}),
   async function(req, res) {
     try {
       const user=req.user
       if (user) {
         res.status(200).json({user})
         // res.redirect('/beers')
       } else {
         console.log('usuario no encontrado');
       }
     } catch (err) {
       res.status(400).json({msg: 'esto fallo'}) 
     }
   });

 router.get('/failed', (req, res) => res.send('No se ha podido logearte con google'))

 function isAuthenticated(req, res, next) {
     if(req.isAuthenticated()) {
       next();
     } else {
       return res.json({ 
           isAdmin: false,
           message: 'User not authenticated'
       })
     }
   }
  
   function isAdmin(req, res, next) {
       if(req.user.admin === true) {
         next();
       } else {
         res.redirect('/admin');
       }
     }
    
     // atributo admin al usuario //
     router.put('/promote/:idUser', (req, res) => {
       ClientendOne({
           where: { id: req.params.Cliente}
       })
       .then (user => {
           user.update({
               admin: !user.admin
           }).then(user => {res.status(200).json ({user})})
     }).catch(error => { res.status(400).json({ error }) })
     });
    

module.exports = router;