package ma.fstt.backend.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {

    @JsonProperty("content")
    private String content;
    @JsonProperty("timestamp")
    private String timestamp;
    @JsonProperty("is_it_mine")
    private Boolean is_it_mine;
    @JsonProperty("otherUsername")
    private String otherUsername;

}
