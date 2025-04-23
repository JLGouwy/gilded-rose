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
});
