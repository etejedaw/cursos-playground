exports.getPosts = (req, res, next) => {
    return res.json({message: "Hello"});
}

exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: "Post created successful",
        post: {title, content}
    });
}