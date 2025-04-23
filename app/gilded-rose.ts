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
      if (this.items[i].name != GildedRose.AGED_BRIE && this.items[i].name != GildedRose.BACKSTAGE_PASSES) {
        if (this.items[i].quality > GildedRose.MIN_QUALITY) {
          if (this.items[i].name != GildedRose.SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < GildedRose.MAX_QUALITY) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == GildedRose.BACKSTAGE_PASSES) {
            if (this.items[i].sellIn < GildedRose.BACKSTAGE_FIRST_THRESHOLD) {
              if (this.items[i].quality < GildedRose.MAX_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < GildedRose.BACKSTAGE_SECOND_THRESHOLD) {
              if (this.items[i].quality < GildedRose.MAX_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != GildedRose.SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != GildedRose.AGED_BRIE) {
          if (this.items[i].name != GildedRose.BACKSTAGE_PASSES) {
            if (this.items[i].quality > GildedRose.MIN_QUALITY) {
              if (this.items[i].name != GildedRose.SULFURAS) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality; // Réinitialisation à 0
          }
        } else {
          if (this.items[i].quality < GildedRose.MAX_QUALITY) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}