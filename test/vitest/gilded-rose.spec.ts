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

  describe('Backstage passes', () => {
    it('should increase quality by 1 when sellIn > 10', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
      ]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(21);
    });

    it('should increase quality by 2 when 5 < sellIn <= 10', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)
      ]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(22);
    });

    it('should increase quality by 3 when 0 < sellIn <= 5', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)
      ]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(23);
    });

    it('should drop quality to 0 after the concert (sellIn < 0)', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)
      ]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
      ]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Conjured Items', () => {
    it('should consider the item as Conjured one', () => {
      const INITIAL_QUALITY = 20;
      const EXPECTED_QUALITY_CONJURED = 18;
      const EXPECTED_QUALITY_STANDARD = 19;
      const conjuredCases = [
        { name: 'Conjured Mana Cake'},
        { name: 'The Conjured Staff' },
        { name: 'Magic Conjured Potion'},
        { name: 'CONJURED Sword'},
        { name: 'the conjured item' },
      ];

      const standardCase = [
        { name: 'Unconjured Item' },
      ];

      conjuredCases.forEach(testCase => {
        const gildedRose = new GildedRose([
          new Item(testCase.name, 10, INITIAL_QUALITY)
        ]);
        
        const items = gildedRose.updateQuality();
        
        expect(items[0].quality).toBe(EXPECTED_QUALITY_CONJURED);
      });

      standardCase.forEach(testCase => {
        const gildedRose = new GildedRose([
          new Item(testCase.name, 10, INITIAL_QUALITY)
        ]);
        
        const items = gildedRose.updateQuality();
        
        expect(items[0].quality).toBe(EXPECTED_QUALITY_STANDARD);
      });
    });

    it('should degrade conjured items twice as fast than standard item', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 20)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(18); // Standard items would be 19
    });

    it('should degrade conjured items twice as fast than standard item after expiry', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 20)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(16); // Standard items would be 18
    });

    it('should not degrade quality below 0 for conjured items', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 1)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(0);
    });

    it('should handle conjured items with 0 quality correctly', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 0)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(0);
    });
  });
});
