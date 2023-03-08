(req: any, res: any)=>{
    const connectDb=async()=>{
      // const task=req.body;
    try{
      
      const client = new Client({
        user: "user1",
        host: "localhost",
        database: "datasets",
        password: "JER@ALD",
        port: 5432,
      });
      await client.connect();
      const gotData=await client.query("SELECT * FROM datasets");
      res.send(gotData);
      await client.end();
      // return res.status(201).send({message:"task created",data:task});
    }
    catch(error){
      console.log(error);
      // return res.status(500).send({errorMessage: 'Error creating task'});
      
    }
    }
    connectDb();
    // console.log("hi");
    
    
};