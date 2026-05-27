package com.example.demo;

import java.time.LocalDateTime;

/** the simplest task 
 * 
 * @author luh
 */
public class Task {
	
	private String taskdescription; // must have the EXACT name as his React state property and may not be ignored!
	private boolean completed = false; 
	private String createdAt;// default value for new tasks

	public Task() {
		this.createdAt = LocalDateTime.now().toString();
    }

	public String getTaskdescription() { // do not apply camel-case here! Its a Bean!
		return taskdescription;
	}

	public void setTaskdescription(String taskdescription) { // do not apply camel-case here! Its a Bean!
		this.taskdescription = taskdescription;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}// default value for new tasks

	public String getCreatedAt() {
		return createdAt;
	}
}