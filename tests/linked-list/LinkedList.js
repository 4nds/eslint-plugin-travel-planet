import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    /** @var LinkedListNode */
    this.head = null;

    /** @var LinkedListNode */
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  prepend(value) {
    // Make new node to be a head.
    const new_node = new LinkedListNode(value, this.head);
    this.head = new_node;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = new_node;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append(value) {
    const new_node = new LinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = new_node;
      this.tail = new_node;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = new_node;
    this.tail = new_node;

    return this;
  }

  /**
   * @param {*} value
   * @param {number} index
   * @return {LinkedList}
   */
  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1;
      let current_node = this.head;
      const new_node = new LinkedListNode(value);
      while (current_node) {
        if (count === index) break;
        current_node = current_node.next;
        count += 1;
      }
      if (current_node) {
        new_node.next = current_node.next;
        current_node.next = new_node;
      } else {
        if (this.tail) {
          this.tail.next = new_node;
          this.tail = new_node;
        } else {
          this.head = new_node;
          this.tail = new_node;
        }
      }
    }
    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deleted_node = null;

    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleted_node = this.head;
      this.head = this.head.next;
    }

    let current_node = this.head;

    if (current_node !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (current_node.next) {
        if (this.compare.equal(current_node.next.value, value)) {
          deleted_node = current_node.next;
          current_node.next = current_node.next.next;
        } else {
          current_node = current_node.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = current_node;
    }

    return deleted_node;
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let current_node = this.head;

    while (current_node) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(current_node.value)) {
        return current_node;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(current_node.value, value)) {
        return current_node;
      }

      current_node = current_node.next;
    }

    return null;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deleted_tail = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deleted_tail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let current_node = this.head;
    while (current_node.next) {
      if (!current_node.next.next) {
        current_node.next = null;
      } else {
        current_node = current_node.next;
      }
    }

    this.tail = current_node;

    return deleted_tail;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deleted_head = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleted_head;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let current_node = this.head;
    while (current_node) {
      nodes.push(current_node);
      current_node = current_node.next;
    }

    return nodes;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   */
  reverse() {
    let curr_node = this.head;
    let prev_node = null;
    let next_node = null;

    while (curr_node) {
      // Store next node.
      next_node = curr_node.next;

      // Change next node of the current node so it would link to previous node.
      curr_node.next = prev_node;

      // Move prev_node and curr_node nodes one step forward.
      prev_node = curr_node;
      curr_node = next_node;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prev_node;

    return this;
  }
}
