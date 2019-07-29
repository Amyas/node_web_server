exports.getList = (author, keyword) => {
  // 先返回假数据（格式是正确的）
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1564129277991,
      author: "作者A"
    },
    {
      id: 1,
      title: "标题B",
      content: "内容B",
      createTime: 1564129278991,
      author: "作者B"
    }
  ];
};

exports.getDetail = id => {
  // 先返回假数据
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1564129277991,
    author: "作者A"
  };
};

exports.createBlog = (data = {}) => {
  // data是一个博客对象，包含 titlle content
  return {
    id: 3
  };
};

exports.updateBlog = (id, data = {}) => {
  return true;
};
