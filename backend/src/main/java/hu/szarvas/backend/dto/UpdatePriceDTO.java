package hu.szarvas.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePriceDTO {
    private int id;
    private int newPrice;
}
