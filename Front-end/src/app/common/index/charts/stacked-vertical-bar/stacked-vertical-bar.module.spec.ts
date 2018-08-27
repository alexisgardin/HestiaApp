import { StackedVerticalBarModule } from './stacked-vertical-bar.module';

describe('StackedVerticalBarModule', () => {
  let stackedVerticalBarModule: StackedVerticalBarModule;

  beforeEach(() => {
    stackedVerticalBarModule = new StackedVerticalBarModule();
  });

  it('should create an instance', () => {
    expect(stackedVerticalBarModule).toBeTruthy();
  });
});
