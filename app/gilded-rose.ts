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
      const item = this.items[i];

      if (this.isSulfuras(item)) {
        // console.info('Sulfuras item never changes');
        continue;
      }

      // console.info('Updating quality for item:', item);
      this.updateItemQuality(item);

      // console.info('Decreasing sellIn for item:', item);
      this.decreaseSellIn(item);


      if (item.sellIn < 0) {
        // console.info('Item has expired, updating quality again:', item);
        this.updateExpiredItemQuality(item);
      }
    }

    return this.items;
  }

  private updateItemQuality(item: Item): void {
    if (this.isAgedBrie(item)) {
      this.increaseQuality(item);
    } else if (this.isBackstagePass(item)) {
      this.updateBackstagePassQuality(item);
    } else {
      this.decreaseQuality(item);
    }
  }

  private updateExpiredItemQuality(item: Item): void {
    if (this.isAgedBrie(item)) {
      this.increaseQuality(item);
    } else if (this.isBackstagePass(item)) {
      this.resetQualityToZero(item);
    } else {
      this.decreaseQuality(item);
    }
  }

  private updateBackstagePassQuality(item: Item): void {
    this.increaseQuality(item);

    if (item.sellIn < GildedRose.BACKSTAGE_FIRST_THRESHOLD) {
      this.increaseQuality(item);
    }

    if (item.sellIn < GildedRose.BACKSTAGE_SECOND_THRESHOLD) {
      this.increaseQuality(item);
    }
  }

  private increaseQuality(item: Item): void {
    if (item.quality < GildedRose.MAX_QUALITY) {
      item.quality = item.quality + 1;
    }
  }

  private decreaseQuality(item: Item): void {
    if (item.quality > GildedRose.MIN_QUALITY) {
      item.quality = item.quality - 1;
    }
  }

  private decreaseSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }

  private resetQualityToZero(item: Item): void {
    item.quality = 0;
  }

  private isAgedBrie(item: Item): boolean {
    return item.name === GildedRose.AGED_BRIE;
  }

  private isBackstagePass(item: Item): boolean {
    return item.name === GildedRose.BACKSTAGE_PASSES;
  }

  private isSulfuras(item: Item): boolean {
    return item.name === GildedRose.SULFURAS;
  }
}