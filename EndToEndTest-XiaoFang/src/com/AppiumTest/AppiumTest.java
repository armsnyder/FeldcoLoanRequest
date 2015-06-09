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
		//List<WebElement> textField = driver.findElements(By.className("android.widget.EditText"));
		//driver.findElement(By.className("android.widget.EditText")).sendKeys("Admin");
		//driver.findElement(By.id("test2")).sendKeys("Admin");
		//driver.findElement(By.linkText("username")).sendKeys("Admin");
		Thread.sleep(30000);
		
		//driver.findElements(By.xpath("android.widge.Button")).get(1).click();
		//driver.findElement(By.className("android.widget.Button")).click();
		//Thread.sleep(3000);
		
		System.out.println("succeeded!");
	}
	
	@AfterMethod
	public void tearDown() throws Exception{
		driver.quit();
	}
	
}
