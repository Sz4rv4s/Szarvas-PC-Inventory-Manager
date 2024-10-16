package hu.szarvas.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePartDTO {
    private String model;
    private String brand;
    private int ar;
    private int warehouseId;
}
