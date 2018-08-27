import { ManageHouseModule } from './manage-house.module';

describe('ManageHouseModule', () => {
  let manageHouseModule: ManageHouseModule;

  beforeEach(() => {
    manageHouseModule = new ManageHouseModule();
  });

  it('should create an instance', () => {
    expect(manageHouseModule).toBeTruthy();
  });
});
