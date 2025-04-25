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

abstract class AbstractProduct {
  constructor(protected item: Item) {}

  abstract updateQuality(): void;

  getItem(): Item {
    return this.item;
  }

  protected increaseQuality(): void {
    if (this.item.quality < GildedRose.MAX_QUALITY) {
      this.item.quality++;
    }
  }

  protected decreaseQuality(): void {
    if (this.item.quality > GildedRose.MIN_QUALITY) {
      this.item.quality--;
    }
  }

  protected decreaseSellIn(): void {
    this.item.sellIn--;
  }

  protected resetQuality(): void {
    this.item.quality = 0;
  }
}

class AgedBrieProduct extends AbstractProduct {
  updateQuality(): void {
    this.decreaseSellIn();
    this.increaseQuality();
    if (this.item.sellIn < 0) {
      this.increaseQuality();
    }
  }
}

class BackstagePassProduct extends AbstractProduct {
  updateQuality(): void {
    this.decreaseSellIn();

    if (this.item.sellIn < 0) {
      this.resetQuality();
      return;
    }

    this.increaseQuality();

    if (this.item.sellIn < GildedRose.BACKSTAGE_FIRST_THRESHOLD) {
      this.increaseQuality();
    }

    if (this.item.sellIn < GildedRose.BACKSTAGE_SECOND_THRESHOLD) {
      this.increaseQuality();
    }
  }
}

class SulfurasProduct extends AbstractProduct {
  updateQuality(): void {
    // Nothing to do
  }
}

class StandardProduct extends AbstractProduct {
  updateQuality(): void {
    this.decreaseSellIn();
    this.decreaseQuality();
    if (this.item.sellIn < 0) {
      this.decreaseQuality();
    }
  }
}

class ConjuredProduct extends AbstractProduct {
  updateQuality(): void {
    this.decreaseSellIn();
    
    // Les items "Conjured" perdent la qualité deux fois plus vite
    this.decreaseQuality();
    this.decreaseQuality();
    
    if (this.item.sellIn < 0) {
      // Après la date de péremption, ils perdent encore deux fois la qualité
      this.decreaseQuality();
      this.decreaseQuality();
    }
  }
}

class ProductFactory {
  static createFrom(item: Item): AbstractProduct {
    if (/\bconjured\b/i.test(item.name.toLowerCase())) {
      return new ConjuredProduct(item);
    }

    switch (item.name) {
      case GildedRose.AGED_BRIE:
        return new AgedBrieProduct(item);
      case GildedRose.BACKSTAGE_PASSES:
        return new BackstagePassProduct(item);
      case GildedRose.SULFURAS:
        return new SulfurasProduct(item);
      default:
        return new StandardProduct(item);
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  static readonly AGED_BRIE = 'Aged Brie';
  static readonly BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
  static readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';
  static readonly CONJURED = 'conjured';

  static readonly MAX_QUALITY = 50;
  static readonly MIN_QUALITY = 0;
  static readonly BACKSTAGE_FIRST_THRESHOLD = 11;
  static readonly BACKSTAGE_SECOND_THRESHOLD = 6;

  constructor(items: Array<Item>) {
    this.items = items;
  }

  updateQuality(): Array<Item> {
    for (let i = 0; i < this.items.length; i++) {
      const product = ProductFactory.createFrom(this.items[i]);
      product.updateQuality();
      this.items[i] = product.getItem();
    }

    return this.items;
  }
}
