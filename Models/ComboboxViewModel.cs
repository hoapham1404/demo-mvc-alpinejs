namespace UserManagementDemo.Models;

public class ComboboxViewModel
{
    public string Id { get; set; } = string.Empty;
    public string ItemsSourcePath { get; set; } = string.Empty; // Path to items in parent scope
    public string DisplayProperty { get; set; } = string.Empty;
    public string ValueProperty { get; set; } = string.Empty;
    public string SelectedValuePath { get; set; } = string.Empty; // Path to selected value in parent scope
    public string? Placeholder { get; set; }
    public string? OnSelectCallback { get; set; } // Callback function name in parent scope
    public string? IsDisabled { get; set; } // Path to disabled state in parent scope
}
