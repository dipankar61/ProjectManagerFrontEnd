import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ParentTaskService } from './parent-task.service';

describe('ParentTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: ParentTaskService = TestBed.get(ParentTaskService);
    expect(service).toBeTruthy();
  });
});
