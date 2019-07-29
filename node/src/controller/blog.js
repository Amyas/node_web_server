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
