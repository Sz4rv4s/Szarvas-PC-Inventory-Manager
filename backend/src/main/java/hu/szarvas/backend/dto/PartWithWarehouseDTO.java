package hu.szarvas.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartWithWarehouseDTO {
    private int id;
    private String model;
    private String brand;
    private int price;
    private WarehouseDTO warehouseId;
}
