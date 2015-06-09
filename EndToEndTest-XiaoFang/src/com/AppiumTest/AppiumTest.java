package com.AppiumTest;

import java.io.File;
import java.net.URL;
import java.util.*;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.*;

public class AppiumTest {
	public WebDriver driver;
	
	@BeforeMethod
	public void setUp() throws Exception{
		File classpathRoot = new File(System.getProperty("user.dir")); 
		File appDir = new File(classpathRoot,"Application");
		File app = new File(appDir,"FeldcoAdHoc.apk");
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("platformName", "Android");
		capabilities.setCapability("deviceName", "TestDevice");
		capabilities.setCapability("app",app.getAbsolutePath());
		capabilities.setCapability("app-activity", ".RootActivity");
		driver = new RemoteWebDriver(new URL("http://127.0.0.1:4723/wd/hub"),capabilities);
	}
	
	@Test
	public void loginTest() throws InterruptedException{
		System.out.println("start!");
		Thread.sleep(15000);
		//List<WebElement> textField = driver.findElements(By.className("android.widget.EditText"));
		driver.findElement(By.xpath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[1]/android.view.View[1]/android.widget.EditText[1]")).sendKeys("Admin");
		//Thread.sleep(2000);
		driver.findElement(By.xpath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[1]/android.view.View[1]/android.widget.EditText[2]")).sendKeys("Admin");
		//Thread.sleep(2000);
		driver.findElement(By.xpath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[1]/android.view.View[1]/android.widget.Button[1]")).click();
		//driver.findElement(By.linkText("username")).sendKeys("Admin");
		driver.findElement(By.xpath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[1]/android.view.View[1]/android.widget.Button[1]")).click();
		Thread.sleep(20000);
		
		//driver.findElements(By.xpath("android.widge.Button")).get(1).click();
		//driver.findElement(By.className("android.widget.Button")).click();
		//Thread.sleep(3000);
		
		System.out.println("succeeded!");
		
		Thread.sleep(45000);
	}
	
	@AfterMethod
	public void tearDown() throws Exception{
		driver.quit();
	}
	
}
