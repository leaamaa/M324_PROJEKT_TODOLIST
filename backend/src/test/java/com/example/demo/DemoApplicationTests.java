package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
		assertTrue(true, "alles gut");
	}

	@Test
void testTaskDescription() {

    Task task = new Task();
    task.setTaskdescription("Hausaufgaben");
    assertEquals("Hausaufgaben", task.getTaskdescription());
}

@Test
void testTaskCompletedInitiallyFalse() {
    Task task = new Task();
    assertTrue(!task.isCompleted());
}


@Test
void testTaskHasCreationDate() {
    Task task = new Task();
    assertTrue(task.getCreatedAt() != null);
}

}
