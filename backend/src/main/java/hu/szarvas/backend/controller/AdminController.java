package hu.szarvas.backend.controller;

import hu.szarvas.backend.dto.ApiResponseDTO;
import hu.szarvas.backend.dto.PartDTO;
import hu.szarvas.backend.dto.UpdatePartDTO;
import hu.szarvas.backend.dto.UpdatePriceDTO;
import hu.szarvas.backend.service.PartsService;
import hu.szarvas.backend.service.WarehousesService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final PartsService partsService;

    public AdminController(PartsService partsService, WarehousesService warehousesService) {
        this.partsService = partsService;
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
