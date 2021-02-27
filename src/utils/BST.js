class Node {
  constructor(data, date) {
    this.data = [data];
    this.date = date;
    this.left = null;
    this.right = null;
  }
  addData(data) {
    this.data.push(data);
  }
  getData() {
    return this.data;
  }
  getDate() {
    return this.date;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  insertNode(node, data) {
    const newDate = data["date"];
    if (newDate < node.getDate()) {
      if (node.left === null) {
        const newNode = new Node(data, data["date"]);
        this.count += 1;
        node.left = newNode;
      } else this.insertNode(node.left, data);
    } else if (newDate > node.getDate()) {
      if (node.right === null) {
        const newNode = new Node(data, data["date"]);
        this.count += 1;
        node.right = newNode;
      } else this.insertNode(node.right, data);
    } else if (newDate === node.getDate()) {
      node.addData(data);
    }
  }

  insert(data) {
    if (this.root === null) {
      const newNode = new Node(data, data["date"]);
      this.count += 1;
      this.root = newNode;
    } else {
      this.insertNode(this.root, data);
    }
  }

  findMinNode(node) {
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  getRootNode() {
    return this.root;
  }

  search(node, time) {
    if (node === null) return null;
    else if (time < node.getDate()) return this.search(node.left, time);
    else if (time > node.getDate()) return this.search(node.right, time);
    else return node;
  }

  searchInBst(time) {
    return this.search(this.root, time);
  }

  make(data) {
    for (let index = 0; index < data.length; index++) {
      this.insert(data[index]);
    }
  }
}
export default BinarySearchTree;
