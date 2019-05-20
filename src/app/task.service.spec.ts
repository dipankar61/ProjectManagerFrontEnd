import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });
});
