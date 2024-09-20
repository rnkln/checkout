export type StorePredicate<T> = (item: T) => boolean;

export type StoreMutator<T> = (item: T) => T;

export type StoreMutatorWithUndefined<T> = (item: T | undefined) => T;

export class Store<T> {
  private items: Array<T> = [];

  constructor(items: Array<T> = []) {
    this.items = items;
  }

  insert(...items: Array<T>) {
    this.items = [...this.items, ...items];
  }

  update(predicate: StorePredicate<T>, mutator: StoreMutator<T>) {
    const index = this.items.findIndex(predicate);
    this.items[index] = mutator(this.items[index]);
  }

  updateOrInsert(
    predicate: StorePredicate<T>,
    mutator: StoreMutatorWithUndefined<T>
  ) {
    const index = this.items.findIndex(predicate);
    const item = this.items[index];

    if (item !== undefined) {
      this.items[index] = mutator(item);
    } else {
      this.insert(mutator(undefined));
    }
  }

  updateMany(predicate: StorePredicate<T>, mutator: StoreMutator<T>) {
    this.items = this.items.map((item) =>
      predicate(item) ? mutator(item) : item
    );
  }

  delete(predicate: StorePredicate<T>) {
    const index = this.items.findIndex(predicate);
    this.items.splice(index, 1);
  }

  deleteMany(predicate: StorePredicate<T>) {
    this.items = this.items.filter((item) => !predicate(item));
  }

  deleteAll() {
    this.items = [];
  }

  getAll() {
    return this.items;
  }

  getCount() {
    return this.items.length;
  }

  find(predicate: StorePredicate<T>) {
    return this.items.find(predicate);
  }

  findMany(predicate: StorePredicate<T>) {
    return this.items.filter(predicate);
  }
}
