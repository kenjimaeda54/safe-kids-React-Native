describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have the register account button is user does not have registration', async () => {
    const welcome =  await element(by.text("Cadastrar"));
    await expect(welcome).toBeVisible()
  });
});
