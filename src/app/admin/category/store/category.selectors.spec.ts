import * as fromCategory from './category.reducer';
import { selectCategoryState } from './category.selectors';

describe('Category Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCategoryState({
      [fromCategory.categoryFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
