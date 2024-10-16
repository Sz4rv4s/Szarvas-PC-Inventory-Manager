package hu.szarvas.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseWithPartsDTO {
    private int id;
    private String name;
    private String city;
    private String address;
    private int capacity;
    private List<PartDTO> parts;
}
