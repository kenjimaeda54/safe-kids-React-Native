describe('SignIn', () => {
	beforeAll(async () => {
		await device.launchApp();
	});

	beforeEach(async () => {
		await device.reloadReactNative();
	});

	it('should have the register account button is user does not have registration', async () => {
		const welcome =  await element(by.text("Cadastrar"));

		await expect(welcome).toBeVisible();
		await device.takeScreenshot("snapshoot-button-register-if-user-dont-have-account");
	});

	it('should go screen Login if user tap button Cadastrar',async()=>{
		const register = await element(by.text("Cadastrar"))
		await register.tap()

		await expect(element(by.id("register-screen"))).toBeVisible();
	})

});
