package hu.szarvas.backend.controller;

import hu.szarvas.backend.dto.PartDTO;
import hu.szarvas.backend.dto.PartWithWarehouseDTO;
import hu.szarvas.backend.dto.WarehouseDTO;
import hu.szarvas.backend.dto.WarehouseWithPartsDTO;
import hu.szarvas.backend.service.PartsService;
import hu.szarvas.backend.service.WarehousesService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final PartsService partsService;

    private final WarehousesService warehousesService;

    public UserController(PartsService partsService, WarehousesService warehousesService, PasswordEncoder passwordEncoder) {
        this.partsService = partsService;
        this.warehousesService = warehousesService;
    }

    @GetMapping("/getallparts")
    public List<PartDTO> getAllParts() {
        return partsService.getAllParts();
    }

    @GetMapping("/getallwarehouses")
    public List<WarehouseDTO> getAllWarehouses() {
        return warehousesService.getAllWarehouses();
    }

    @GetMapping("/getallpartswithwarehouse")
    public List<PartWithWarehouseDTO> getAllPartsWithWarehouse() {
        return partsService.getAllPartsWithWarehouse();
    }

    @GetMapping("/getallwarehouseswithparts")
    public List<WarehouseWithPartsDTO> getAllWarehousesWithParts() {
        return warehousesService.getAllWarehousesWithParts();
    }

    @GetMapping("/getpart/{id}")
    public PartDTO getPart(@PathVariable final int id) {
        return partsService.getPartById(id);
    }

    @GetMapping("/search/{name}")
    public List<PartDTO> searchPart(@PathVariable final String name) {
        return partsService.searchPartsByModel(name);
    }

    @GetMapping("/getwarehousebyid/{warehouseId}")
    public WarehouseWithPartsDTO getWarehouseById(@PathVariable final int warehouseId) {
        return warehousesService.getPartsByWarehouseId(warehouseId);
    }

    @GetMapping("/getwarehousebyname/{warehouseName}")
    public List<WarehouseWithPartsDTO> getWarehouseByName(@PathVariable final String warehouseName) {
        return warehousesService.getPartsByWarehouseName(warehouseName);
    }
}
