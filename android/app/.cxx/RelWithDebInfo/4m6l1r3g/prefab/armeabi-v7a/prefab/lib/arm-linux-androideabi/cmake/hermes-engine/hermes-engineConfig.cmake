if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/ntf-m5/.gradle/caches/8.13/transforms/b79a6991c6d662c4660c4621ab26b4e1/transformed/hermes-android-0.79.0-release/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/ntf-m5/.gradle/caches/8.13/transforms/b79a6991c6d662c4660c4621ab26b4e1/transformed/hermes-android-0.79.0-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

