const express = require("express");

const userService = require('./service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
   try {
      const users = await userService.getUsers();
       res.send(users);
   } catch (e) {
       res.status(500).send(e.message);
   }
});

app.get('/users/:userId', async (req, res) => {
   try {
      const users = await userService.getUsers();

       const userId = Number(req.params.userId);
       if (Number.isNaN(userId) || userId < 0 || !Number.isInteger(userId)) {
         res.status(400).json('Wrong user Id')
         return;
       }

       const user = users.find(user => user.id === userId);
       if (!user) {
           return res.status(404).send(`User with ID: ${userId} exist!`);
       }
       res.send(user);
   } catch (e) {
       res.status(500).send(e.message);
   }
});

app.post('/users', async (req, res) => {
   try {
      const {name, email, password} = req.body;
      if (name.length < 2 || name.length > 20) {
         res.status(400).json('Name mast be min 2 symbols and max 20 symbols')
      }
      if (!email.includes('@')) {
         res.status(400).json('Not valid email address!')
     }
     if (password.length < 6) {
      res.status(400).json('Not valid password')
  }

      const newUser = {name, email, password};

      const users = await userService.getUsers();

      newUser.id = users.length ?  users[users.length - 1].id + 1 : 1;
      users.push(newUser);

      await userService.saveNewUser(users)

      res.status(201).send(newUser);
   } catch (e) {
      res.status(500).send(e.message);
   }
})

app.put('/users/:userId', async (req, res) => {
   try {
      const {name, email, password} = req.body;
      //to do validate
      const users = await userService.getUsers();
      const userUpdate = {};

      const userId = Number(req.params.userId);
      if (Number.isNaN(userId) || userId < 0 || !Number.isInteger(userId)) {
         res.status(400).json('Wrong user Id')
         return;
     }

      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
          return res.status(404).send('User not found');
      }

     if (name) userUpdate.name = name;
     if (email) userUpdate.email = email;
     if (password) userUpdate.password = password;


     users[userIndex] = {...users[userIndex], ...userUpdate};

     await userService.saveNewUser(users);

     res.status(201).send(userUpdate);
   } catch (e) {
      res.status(500).send(e.message);
   }
})

app.delete('/users/:userId', async (req, res) => {
   try {
      const users = await userService.getUsers();

       const userId = Number(req.params.userId);
       if (Number.isNaN(userId) || userId < 0 || !Number.isInteger(userId)) {
         res.status(400).json('Wrong user Id')
         return;
      }

       const userIndex = users.findIndex(user => user.id === userId);
       if (userIndex === -1) {
           return res.status(404).send('User not found');
       }

       users.splice(userIndex, 1);

       await userService.saveNewUser(users);

       res.sendStatus(204);
   } catch (e) {
       res.status(500).send(e.message);
   }
});

app.listen(5000, () => {
   console.log('Server is running on http://localhost:5000');
});