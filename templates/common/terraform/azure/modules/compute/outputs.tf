output "instance_ids" {
  value = azurerm_linux_virtual_machine.app[*].id
}
