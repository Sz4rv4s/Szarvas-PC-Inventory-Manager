package hu.szarvas.backend.controller;

import hu.szarvas.backend.dto.*;
import hu.szarvas.backend.service.PartsService;
import hu.szarvas.backend.service.WarehousesService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RequestController {

    private final PartsService partsService;

    private final WarehousesService warehousesService;

    public RequestController(PartsService partsService, WarehousesService warehousesService) {
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

    @PostMapping("/addpart/{warehouseId}")
    public ApiResponseDTO addPart(@PathVariable final int warehouseId, @RequestBody final PartDTO part) {
        try {
            partsService.addPart(part, warehouseId);
            return new ApiResponseDTO("Part added successfully");
        } catch (ResponseStatusException e) {
            return new ApiResponseDTO("Failed to add part" + e.getReason());
        }
    }

    @DeleteMapping("/deletepart/{partId}")
    public ApiResponseDTO deletePart(@PathVariable final int partId) {
        try {
            partsService.deletePart(partId);
            return new ApiResponseDTO("Part deleted successfully");
        } catch (ResponseStatusException e) {
            return new ApiResponseDTO("Failed to delete part" + e.getReason());
        }
    }

    @PatchMapping("/updateprice")
    public ApiResponseDTO updatePrice(@RequestBody UpdatePriceDTO updatePriceDTO) {
        try {
            partsService.updatePartPrice(updatePriceDTO.getId(), updatePriceDTO.getNewPrice());
            return new ApiResponseDTO("Part updated successfully");
        } catch (ResponseStatusException e) {
            return new ApiResponseDTO("Failed to update price" + e.getReason());
        }
    }

    @PutMapping("/updatepart/{partId}")
    public ApiResponseDTO updatePart(@PathVariable final int partId, @RequestBody final UpdatePartDTO updatePartDTO) {
        try {
            partsService.updatePart(partId, updatePartDTO);
            return new ApiResponseDTO("Part updated successfully");
        } catch (ResponseStatusException e) {
            return new ApiResponseDTO("Failed to update part" + e.getReason());
        }
    }

}
