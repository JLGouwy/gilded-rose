// !! do not touch Item class !!
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
// !! do not touch Item class !!

class Product extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.isSulfuras()) {
      // console.info('Sulfuras item never changes');
      return;
    }

    // console.info('Updating quality for item:', this);
    this.updateItemQuality();

    // console.info('Decreasing sellIn for item:', this);
    this.decreaseSellIn();

    if (this.sellIn < 0) {
      // console.info('Item has expired, updating quality again:', this);
      this.updateExpiredItemQuality();
    }
  }

  private updateItemQuality(): void {
    if (this.isAgedBrie()) {
      this.increaseQuality();
    } else if (this.isBackstagePass()) {
      this.updateBackstagePassQuality();
    } else {
      this.decreaseQuality();
    }
  }

  private updateExpiredItemQuality(): void {
    if (this.isAgedBrie()) {
      this.increaseQuality();
    } else if (this.isBackstagePass()) {
      this.resetQualityToZero();
    } else {
      this.decreaseQuality();
    }
  }

  private updateBackstagePassQuality(): void {
    this.increaseQuality();

    if (this.sellIn < GildedRose.BACKSTAGE_FIRST_THRESHOLD) {
      this.increaseQuality();
    }

    if (this.sellIn < GildedRose.BACKSTAGE_SECOND_THRESHOLD) {
      this.increaseQuality();
    }
  }

  private increaseQuality(): void {
    if (this.quality < GildedRose.MAX_QUALITY) {
      this.quality = this.quality + 1;
    }
  }

  private decreaseQuality(): void {
    if (this.quality > GildedRose.MIN_QUALITY) {
      this.quality = this.quality - 1;
    }
  }

  private decreaseSellIn(): void {
    this.sellIn = this.sellIn - 1;
  }

  private resetQualityToZero(): void {
    this.quality = 0;
  }

  private isAgedBrie(): boolean {
    return this.name === GildedRose.AGED_BRIE;
  }

  private isBackstagePass(): boolean {
    return this.name === GildedRose.BACKSTAGE_PASSES;
  }

  private isSulfuras(): boolean {
    return this.name === GildedRose.SULFURAS;
  }
}

class ProductFactory {
  static create(name: string, sellIn: number, quality: number): Product {
    return new Product(name, sellIn, quality);
  }
}

export class GildedRose {
  items: Array<Item>;

  static readonly AGED_BRIE = 'Aged Brie';
  static readonly BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
  static readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';

  static readonly MAX_QUALITY = 50;
  static readonly MIN_QUALITY = 0;
  static readonly BACKSTAGE_FIRST_THRESHOLD = 11;
  static readonly BACKSTAGE_SECOND_THRESHOLD = 6;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const product = ProductFactory.create(this.items[i].name, this.items[i].sellIn, this.items[i].quality)
      product.updateQuality();

      this.items[i] = product;
    }

    return this.items;
  }
}