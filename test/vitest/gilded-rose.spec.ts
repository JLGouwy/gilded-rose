import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  describe('Standard items', () => {
    it('should decrease quality and sellIn by 1 for standard items', () => {
      expect(true).toBe(true);
      const gildedRose = new GildedRose([new Item('standard item', 10, 20)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it('should decrease quality by 2 once sellIn date has passed', () => {
      const gildedRose = new GildedRose([new Item('standard item', 0, 20)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });

    it('should not decrease quality below 0', () => {
      const gildedRose = new GildedRose([new Item('standard item', 5, 0)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('should increase quality by 1 as it gets older', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(21);
    });

    it('should increase quality by 2 after sellIn date', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 20)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(22);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(50);
    });

    it('should not increase quality above 50 even after sellIn date', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 49)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Sulfuras - Legendary Item', () => {
    it('should never change quality or sellIn', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(80);
    });
  });
});
