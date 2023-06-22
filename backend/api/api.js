const Post = require("../models/post")
const fs = require('fs');

module.exports = class API {

    // all Post
    static async fetchAllPost(req, res) {
        try {
            const post = await Post.find();
            res.status(200).json(post);
        }
        catch(err) {
            res.status(404).json({message: err.message});
        }
    }


    // post by Id

    static async fetchPostById(req, res) {
       const id = req.params.id
       try {
        const post = await Post.findById(id)
        res.status(200).json(post)
       }catch(err) {
            res.status(404).json({message: err.message})
       }
    }

    // create Post

    static async createPost(req, res) {
       const post = req.body;
       const imagename = req.file.filename;
       post.image = imagename;

       try {
            await Post.create(post);
            res.status(200).json({message: 'Post created successfuly'})
       }catch(err) {
            res.status(400).json({message: err.message})
       }
    }
    
    // Update Post
    static async updatePost(req, res) {
      const id = req.params.id;
      let new_image = "";
    
      if (req.file) {
        new_image = req.file.filename;
        try {
          fs.unlinkSync("./uploads/" + req.body.old_image);
        } catch (err) {
          console.log(err);
        }
      } else {
        new_image = req.body.old_image;
      }
    
      const newPost = {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        image: new_image
      };
    
      try {
        await Post.findByIdAndUpdate(id, newPost);
        const updatedPost = await Post.findById(id);
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    }
    
  
    static async deletePost(req, res) {
        const id = req.params.id;

        try{

            const result = await Post.findByIdAndDelete(id);
            if(result.image!= '') {
                try {
                    fs.unlinkSync("./uploads/"+result.image)
                }catch(err) {
                    console.log(err)
                }
            }
            res.status(200).json({message: 'Post deleted successfully!'})

        }catch(err) {
            res.status(404).json({message: err.message})
        }
    }


}