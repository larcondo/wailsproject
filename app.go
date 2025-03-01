package main

import (
	"context"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	db  *gorm.DB
}

type TodoEntry struct {
	gorm.Model
	Content   string
	Priority  int
	Completed bool
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&TodoEntry{})
	// db.Create(&TodoEntry{Content: "Entrada de prueba", Priority: 1})

	a.ctx = ctx
	a.db = db
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hola %s, es hora del juego!", name)
}

// Get all existing Todos
func (a *App) GetAllTodos() []TodoEntry {
	var todos []TodoEntry

	result := a.db.Order("created_At desc").Find(&todos)

	fmt.Println(result.RowsAffected)

	return todos
}

func (a *App) GetDeleted() []TodoEntry {
	var todos []TodoEntry

	a.db.Unscoped().Where("deleted_at IS NOT NULL").Order("deleted_at desc").Find(&todos)

	return todos
}

// Create a new Todo and stores it in database
func (a *App) CreateTodo(content string, priority int) TodoEntry {
	todo := TodoEntry{Content: content, Priority: priority, Completed: false}

	a.db.Create(&todo)

	return todo
}

func (a *App) UpdateCompleted(ID uint, completed bool) TodoEntry {
	var todo TodoEntry
	a.db.First(&todo, ID)
	todo.Completed = !completed
	a.db.Save(&todo)
	return todo
}

func (a *App) DeleteTodo(ID uint) TodoEntry {
	var todo TodoEntry
	a.db.First(&todo, ID)
	a.db.Delete(&todo)
	return todo
}

func (a *App) DeletePermanently(ids []uint) ([]uint, error) {

	result := a.db.Unscoped().Delete(&TodoEntry{}, ids)

	return ids, result.Error
}
