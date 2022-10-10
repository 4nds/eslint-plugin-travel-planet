import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const linked_list = new LinkedList();
    expect(linked_list.toString()).toBe('');
  });

  it('should append node to linked list', () => {
    const linked_list = new LinkedList();

    expect(linked_list.head).toBeNull();
    expect(linked_list.tail).toBeNull();

    linked_list.append(1);
    linked_list.append(2);

    expect(linked_list.toString()).toBe('1,2');
    expect(linked_list.tail.next).toBeNull();
  });

  it('should prepend node to linked list', () => {
    const linked_list = new LinkedList();

    linked_list.prepend(2);
    expect(linked_list.head.toString()).toBe('2');
    expect(linked_list.tail.toString()).toBe('2');

    linked_list.append(1);
    linked_list.prepend(3);

    expect(linked_list.toString()).toBe('3,2,1');
  });

  it('should insert node to linked list', () => {
    const linked_list = new LinkedList();

    linked_list.insert(4, 3);
    expect(linked_list.head.toString()).toBe('4');
    expect(linked_list.tail.toString()).toBe('4');

    linked_list.insert(3, 2);
    linked_list.insert(2, 1);
    linked_list.insert(1, -7);
    linked_list.insert(10, 9);

    expect(linked_list.toString()).toBe('1,4,2,3,10');
  });

  it('should delete node by value from linked list', () => {
    const linked_list = new LinkedList();

    expect(linked_list.delete(5)).toBeNull();

    linked_list.append(1);
    linked_list.append(1);
    linked_list.append(2);
    linked_list.append(3);
    linked_list.append(3);
    linked_list.append(3);
    linked_list.append(4);
    linked_list.append(5);

    expect(linked_list.head.toString()).toBe('1');
    expect(linked_list.tail.toString()).toBe('5');

    const deleted_node = linked_list.delete(3);
    expect(deleted_node.value).toBe(3);
    expect(linked_list.toString()).toBe('1,1,2,4,5');

    linked_list.delete(3);
    expect(linked_list.toString()).toBe('1,1,2,4,5');

    linked_list.delete(1);
    expect(linked_list.toString()).toBe('2,4,5');

    expect(linked_list.head.toString()).toBe('2');
    expect(linked_list.tail.toString()).toBe('5');

    linked_list.delete(5);
    expect(linked_list.toString()).toBe('2,4');

    expect(linked_list.head.toString()).toBe('2');
    expect(linked_list.tail.toString()).toBe('4');

    linked_list.delete(4);
    expect(linked_list.toString()).toBe('2');

    expect(linked_list.head.toString()).toBe('2');
    expect(linked_list.tail.toString()).toBe('2');

    linked_list.delete(2);
    expect(linked_list.toString()).toBe('');
  });

  it('should delete linked list tail', () => {
    const linked_list = new LinkedList();

    linked_list.append(1);
    linked_list.append(2);
    linked_list.append(3);

    expect(linked_list.head.toString()).toBe('1');
    expect(linked_list.tail.toString()).toBe('3');

    const deleted_node1 = linked_list.deleteTail();

    expect(deleted_node1.value).toBe(3);
    expect(linked_list.toString()).toBe('1,2');
    expect(linked_list.head.toString()).toBe('1');
    expect(linked_list.tail.toString()).toBe('2');

    const deleted_node2 = linked_list.deleteTail();

    expect(deleted_node2.value).toBe(2);
    expect(linked_list.toString()).toBe('1');
    expect(linked_list.head.toString()).toBe('1');
    expect(linked_list.tail.toString()).toBe('1');

    const deleted_node3 = linked_list.deleteTail();

    expect(deleted_node3.value).toBe(1);
    expect(linked_list.toString()).toBe('');
    expect(linked_list.head).toBeNull();
    expect(linked_list.tail).toBeNull();
  });

  it('should delete linked list head', () => {
    const linked_list = new LinkedList();

    expect(linked_list.deleteHead()).toBeNull();

    linked_list.append(1);
    linked_list.append(2);

    expect(linked_list.head.toString()).toBe('1');
    expect(linked_list.tail.toString()).toBe('2');

    const deleted_node1 = linked_list.deleteHead();

    expect(deleted_node1.value).toBe(1);
    expect(linked_list.toString()).toBe('2');
    expect(linked_list.head.toString()).toBe('2');
    expect(linked_list.tail.toString()).toBe('2');

    const deleted_node2 = linked_list.deleteHead();

    expect(deleted_node2.value).toBe(2);
    expect(linked_list.toString()).toBe('');
    expect(linked_list.head).toBeNull();
    expect(linked_list.tail).toBeNull();
  });

  it('should be possible to store objects in the list and to print them out', () => {
    const linked_list = new LinkedList();

    const nodeValue1 = { value: 1, key: 'key1' };
    const nodeValue2 = { value: 2, key: 'key2' };

    linked_list
      .append(nodeValue1)
      .prepend(nodeValue2);

    const nodeStringifier = (value) => `${value.key}:${value.value}`;

    expect(linked_list.toString(nodeStringifier)).toBe('key2:2,key1:1');
  });

  it('should find node by value', () => {
    const linked_list = new LinkedList();

    expect(linked_list.find({ value: 5 })).toBeNull();

    linked_list.append(1);
    expect(linked_list.find({ value: 1 })).toBeDefined();

    linked_list
      .append(2)
      .append(3);

    const node = linked_list.find({ value: 2 });

    expect(node.value).toBe(2);
    expect(linked_list.find({ value: 5 })).toBeNull();
  });

  it('should find node by callback', () => {
    const linked_list = new LinkedList();

    linked_list
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' });

    const node = linked_list.find({ callback: (value) => value.key === 'test2' });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.key).toBe('test2');
    expect(linked_list.find({ callback: (value) => value.key === 'test5' })).toBeNull();
  });

  it('should create linked list from array', () => {
    const linked_list = new LinkedList();
    linked_list.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    expect(linked_list.toString()).toBe('1,1,2,3,3,3,4,5');
  });

  it('should find node by means of custom compare function', () => {
    const comparatorFunction = (a, b) => {
      if (a.customValue === b.customValue) {
        return 0;
      }

      return a.customValue < b.customValue ? -1 : 1;
    };

    const linked_list = new LinkedList(comparatorFunction);

    linked_list
      .append({ value: 1, customValue: 'test1' })
      .append({ value: 2, customValue: 'test2' })
      .append({ value: 3, customValue: 'test3' });

    const node = linked_list.find({
      value: { value: 2, customValue: 'test2' },
    });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.customValue).toBe('test2');
    expect(linked_list.find({ value: 2, customValue: 'test5' })).toBeNull();
  });

  it('should find preferring callback over compare function', () => {
    const greaterThan = (value, compareTo) => (value > compareTo ? 0 : 1);

    const linked_list = new LinkedList(greaterThan);
    linked_list.fromArray([1, 2, 3, 4, 5]);

    let node = linked_list.find({ value: 3 });
    expect(node.value).toBe(4);

    node = linked_list.find({ callback: (value) => value < 3 });
    expect(node.value).toBe(1);
  });

  it('should convert to array', () => {
    const linked_list = new LinkedList();
    linked_list.append(1);
    linked_list.append(2);
    linked_list.append(3);
    expect(linked_list.toArray().join(',')).toBe('1,2,3');
  });

  it('should reverse linked list', () => {
    const linkedList = new LinkedList();

    // Add test values to linked list.
    linked_list
      .append(1)
      .append(2)
      .append(3);

    expect(linked_list.toString()).toBe('1,2,3');
    expect(linked_list.head.value).toBe(1);
    expect(linked_list.tail.value).toBe(3);

    // Reverse linked list.
    linked_list.reverse();
    expect(linked_list.toString()).toBe('3,2,1');
    expect(linked_list.head.value).toBe(3);
    expect(linked_list.tail.value).toBe(1);

    // Reverse linked list back to initial state.
    linked_list.reverse();
    expect(linked_list.toString()).toBe('1,2,3');
    expect(linked_list.head.value).toBe(1);
    expect(linked_list.tail.value).toBe(3);
  });
});
