import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [TodoComponent],
      imports: [FormsModule, TodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve adicionar uma tarefa', () => {
    component.newTask = 'Nova tarefa';
    component.addTask();
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Nova tarefa');
  });

  it('não deve adicionar tarefa vazia', () => {
    component.newTask = '   ';
    component.addTask();
    expect(component.tasks.length).toBe(1);
  });

  it('deve remover uma tarefa', () => {
    const task = { title: 'Remover essa', completed: false };
    component.tasks = [task];
    component.removeTask(task);
    expect(component.tasks.length).toBe(0);
  });

  it('deve marcar uma tarefa como concluída via checkbox (DOM interaction)', fakeAsync(() => {
    component.newTask = 'Testar DOM';
    component.addTask();
    fixture.detectChanges();
    tick();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    checkbox.click(); // simula clique

    fixture.detectChanges();
    tick();

    expect(component.tasks[0].completed).toBe(true);
  }));

  it('deve atualizar o DOM ao adicionar tarefas', fakeAsync(() => {
    component.newTask = 'DOM Update';
    component.addTask();
    fixture.detectChanges();
    tick();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].nativeElement.textContent).toContain('DOM Update');
  }));

  it('deve limpar input após adicionar tarefa', () => {
    component.newTask = 'Tarefa limpa';
    component.addTask();
    expect(component.newTask).toBe('');
  });
});
